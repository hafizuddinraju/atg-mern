//user info set database
export const saveUserMongodb = (username, email) => {
 
  const user = { username, email };
  fetch("http://localhost:5000/signup", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
