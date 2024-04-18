import { Router, Request, Response } from "express";
import { pgClient } from "../pgClients";
import { checkPassword, hashPassword } from "../utils/hash";



export const accountRouter = Router();

//get the existing products

accountRouter.post("/register", register);
accountRouter.post("/login", login)
accountRouter.get("/logout", logout)
accountRouter.get("/getusername", getUsername)

async function register(req: Request, res: Response) {
  console.log("hi")
  let { email, username, password } = req.body;
  console.log(email, username, password)
  let hashedPassword = await hashPassword(password)
  console.log(email, username, password, hashedPassword)
  try {
    let userQueryResult = (
      await pgClient.query(
        "SELECT username,password,id FROM users WHERE email = $1 OR username = $2",
        [email, username]
      )
    ).rows[0];

  } catch (e) {
    console.log(e)
    res.status(400).json({ message: e });

  }
}

async function login(req: Request, res: Response) {
  let { username, password } = req.body;

  let userQueryResult = (
    await pgClient.query(
      "SELECT username,password,id FROM users WHERE username = $1",
      [username]
    )
  ).rows[0];


  //   username exists
  if (userQueryResult) {
    let truePassword = userQueryResult.password;

    // const isMatched = password == truePassword
    const isMatched = await checkPassword({ plainPassword: password, hashedPassword: truePassword })


    // password matched
    if (isMatched) {
      req.session.userId = userQueryResult.id;
      req.session.username = userQueryResult.username;

      req.session.save();

      res.json({
        message: "login success",
        data: { username: userQueryResult.username },
      });
    } else {
      console.log("log in failed,wrong password");

      res.status(400).json({ message: "Login Failed" });
    }
  } else {
    console.log("log in failed,wrong email");
    res.status(400).json({ message: "Login Failed" });
  }
}


async function logout(req: Request, res: Response) {
  if (req.session.username) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Server Internal Error" });
      }

      res.status(200).json({ message: "Logout success" });
    });
  } else {
    res.status(400).json({ message: "You are not logged in." });
  }
}

async function getUsername(req: Request, res: Response) {
  if (req.session.username) {
    res.json({ data: { username: req.session.username } });
  } else {
    res.status(400).json({ message: "You are not logged in." });
  }
}
