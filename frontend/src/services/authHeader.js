export default function authHeader() {
  const token = localStorage.getItem("token");

  if (token) {
    console.log(token);
    return { "x-access-token": token, "Content-Type": "application/json" };
  } else {
    return {};
  }
}
