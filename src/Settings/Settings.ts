
export default class Settings {
  
  get host(): string{
    const localhosts = ['localhost', '127.0.0.1'];
    if(!localhosts.includes(window.location.hostname.toLocaleLowerCase())){
      return "";
    }else{
      return "http://localhost:5002/" 
    }
    
  }
}
