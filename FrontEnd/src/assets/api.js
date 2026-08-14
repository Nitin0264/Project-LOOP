
window.LOOP_API = {
  baseUrl: localStorage.getItem("LOOP_API_BASE_URL") || "http://localhost:3000/api",
  tokenKey: "LOOP_ACCESS_TOKEN",
  async request(path, options={}){
    const headers = {"Content-Type":"application/json", ...(options.headers||{})};
    const token = localStorage.getItem(this.tokenKey);
    if(token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${this.baseUrl}${path}`, {...options, headers});
    if(!response.ok){
      const text = await response.text().catch(()=> "");
      throw new Error(text || `Request failed (${response.status})`);
    }
    const type = response.headers.get("content-type") || "";
    return type.includes("application/json") ? response.json() : response.text();
  },
  get(path){ return this.request(path); },
  post(path, body){ return this.request(path,{method:"POST",body:JSON.stringify(body)}); },
  patch(path, body){ return this.request(path,{method:"PATCH",body:JSON.stringify(body)}); },
  setBaseUrl(url){ localStorage.setItem("LOOP_API_BASE_URL",url.replace(/\/$/,"")); this.baseUrl=url.replace(/\/$/,""); }
};
