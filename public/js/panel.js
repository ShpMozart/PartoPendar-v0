let host = location.host;
if (location.pathname != "/panel") {
  setTimeout(() => {
    location.href = "http://" + host + "/panel";
  }, 200);
}
