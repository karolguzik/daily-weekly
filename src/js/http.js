class EasyHttp { 
  async get(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }

  async post(url, data){
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json();
    return result;
  }

  async put(url, data){
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await response.json();
    return result;
  }

  async delete(url){
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })

    const resData = await 'Task deleted...';
    return resData;
  }
}


export const http = new EasyHttp();