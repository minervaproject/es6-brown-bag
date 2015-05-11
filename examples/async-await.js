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

class RedditApi2 extends RedditApi {
  async getPages(numPages = 3) {
    let after = "";
    let data = [];

    for (let i = 0; i < numPages; i++) {
      const pageData = await this.getData(after);
      data = data.concat(pageData.data.children);
    }

    return data;
  }
}

async function go() {
  const data = await new RedditApi2().getPages(3);
  console.log("Number of items", data.length);
}

go();
