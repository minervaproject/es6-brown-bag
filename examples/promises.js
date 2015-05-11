const fetch = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onreadystatechange = (e) => {
      if (e.target.readyState === 4 && e.target.status === 200) {
        resolve(JSON.parse(e.target.response));
      }
    };

    xhr.send();
  });
}

class RedditApi {
  getPages(numPages = 3) {
    return new Promise((resolve, reject) => {
      let data = [];

      const getPage = (after, numPages) => {
        if (numPages === 0) {
          resolve(data);
        } else {
          this.getData(after).then((nextPageData) => {
            data = data.concat(nextPageData.data.children);
            getPage(nextPageData.data.after, numPages - 1);
          });
        }
      }

      getPage("", numPages);
    });
  }

  getData(after) {
    const url = this.makeUrl(after);
    return fetch(url);
  }

  makeUrl(after) {
    return `http://api.reddit.com/hot?after=${after}`;
  }
}

new RedditApi().getPages(3).then((data) => {
  console.log("Number of items", data.length);
});
