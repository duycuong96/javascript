
const API = "http://5dcd817fd795470014e4d1fd.mockapi.io/user";



function getUser(API){
 axios.get(API)
 .then(function (response) {
    const user =response.data;
    user.map(users =>{
        console.log(users.name); 
    });
})
  .catch(function (error) {
 console.log("lỗi"+error);
 })
}

getUser(API);

function del(id){
    axios.delete(`${API}/${id}`)
    .then(function(response){
        console.log(response);
    })
    .catch (function(error){
        console.log("Lỗi " + error);
    });
    
};

del(1);





