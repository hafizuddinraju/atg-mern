//user info set database
export const saveUserMongodb = (username, email) => {
  const user = { username, email };
  fetch("https://server-atg-mern.vercel.app/signup", {
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
