// "/manageProduct/showProduct/cat/1"

async function getProducs() {
    try {
      const response = await fetch(`/manageProduct/showProduct/cat/2`);
      const data = await response.json();
      console.log(data)
     
    } catch (error) {
      // 處理錯誤
      console.error('Error:', error);
      throw error;
    }
  }

  getProducs()