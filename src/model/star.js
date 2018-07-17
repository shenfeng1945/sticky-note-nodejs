const star = `
              <svg class="icon icon-18 gray" @click="changeStar" viewBox="0 0 1024 1024" width="100%" height="100%"><path d="M956 398.5c-10.4-31-36.9-53.3-69.2-58.2L682.1 309l-91.6-195c-7.3-15.6-18.9-28.5-33.6-37.4-13.5-8.2-29.1-12.5-44.9-12.5-15.9 0-31.4 4.3-44.9 12.5-14.7 8.9-26.3 21.8-33.6 37.4l-91.6 195-204.7 31.3c-32.3 4.9-58.8 27.2-69.2 58.2-10.4 31-2.6 64.7 20.2 88.1l150.7 154.5-35.6 218c-4.1 25.2 3 50.7 19.5 70.1 16.6 19.5 40.7 30.7 66.2 30.7 14.6 0 29.1-3.8 42-10.9l181-100 181 100.1c12.9 7.1 27.4 10.9 42 10.9 25.5 0 49.6-11.2 66.2-30.7 16.5-19.4 23.6-44.9 19.5-70.1l-35.6-218 150.7-154.5c22.8-23.4 30.5-57.2 20.2-88.2z"></path></svg>
              <svg class="icon icon-18 gray" viewBox="0 0 1024 1024" width="100%" height="100%"><path d="M956 398.5c-10.4-31-36.9-53.3-69.2-58.2L682.1 309l-91.6-195c-7.3-15.6-18.9-28.5-33.6-37.4-13.5-8.2-29.1-12.5-44.9-12.5-15.9 0-31.4 4.3-44.9 12.5-14.7 8.9-26.3 21.8-33.6 37.4l-91.6 195-204.7 31.3c-32.3 4.9-58.8 27.2-69.2 58.2-10.4 31-2.6 64.7 20.2 88.1l150.7 154.5-35.6 218c-4.1 25.2 3 50.7 19.5 70.1 16.6 19.5 40.7 30.7 66.2 30.7 14.6 0 29.1-3.8 42-10.9l181-100 181 100.1c12.9 7.1 27.4 10.9 42 10.9 25.5 0 49.6-11.2 66.2-30.7 16.5-19.4 23.6-44.9 19.5-70.1l-35.6-218 150.7-154.5c22.8-23.4 30.5-57.2 20.2-88.2z"></path></svg>
              <svg class="icon icon-18 gray" viewBox="0 0 1024 1024" width="100%" height="100%"><path d="M956 398.5c-10.4-31-36.9-53.3-69.2-58.2L682.1 309l-91.6-195c-7.3-15.6-18.9-28.5-33.6-37.4-13.5-8.2-29.1-12.5-44.9-12.5-15.9 0-31.4 4.3-44.9 12.5-14.7 8.9-26.3 21.8-33.6 37.4l-91.6 195-204.7 31.3c-32.3 4.9-58.8 27.2-69.2 58.2-10.4 31-2.6 64.7 20.2 88.1l150.7 154.5-35.6 218c-4.1 25.2 3 50.7 19.5 70.1 16.6 19.5 40.7 30.7 66.2 30.7 14.6 0 29.1-3.8 42-10.9l181-100 181 100.1c12.9 7.1 27.4 10.9 42 10.9 25.5 0 49.6-11.2 66.2-30.7 16.5-19.4 23.6-44.9 19.5-70.1l-35.6-218 150.7-154.5c22.8-23.4 30.5-57.2 20.2-88.2z"></path></svg>
              <svg class="icon icon-18 gray" viewBox="0 0 1024 1024" width="100%" height="100%"><path d="M956 398.5c-10.4-31-36.9-53.3-69.2-58.2L682.1 309l-91.6-195c-7.3-15.6-18.9-28.5-33.6-37.4-13.5-8.2-29.1-12.5-44.9-12.5-15.9 0-31.4 4.3-44.9 12.5-14.7 8.9-26.3 21.8-33.6 37.4l-91.6 195-204.7 31.3c-32.3 4.9-58.8 27.2-69.2 58.2-10.4 31-2.6 64.7 20.2 88.1l150.7 154.5-35.6 218c-4.1 25.2 3 50.7 19.5 70.1 16.6 19.5 40.7 30.7 66.2 30.7 14.6 0 29.1-3.8 42-10.9l181-100 181 100.1c12.9 7.1 27.4 10.9 42 10.9 25.5 0 49.6-11.2 66.2-30.7 16.5-19.4 23.6-44.9 19.5-70.1l-35.6-218 150.7-154.5c22.8-23.4 30.5-57.2 20.2-88.2z"></path></svg>
              <svg class="icon icon-18 gray" viewBox="0 0 1024 1024" width="100%" height="100%"><path d="M956 398.5c-10.4-31-36.9-53.3-69.2-58.2L682.1 309l-91.6-195c-7.3-15.6-18.9-28.5-33.6-37.4-13.5-8.2-29.1-12.5-44.9-12.5-15.9 0-31.4 4.3-44.9 12.5-14.7 8.9-26.3 21.8-33.6 37.4l-91.6 195-204.7 31.3c-32.3 4.9-58.8 27.2-69.2 58.2-10.4 31-2.6 64.7 20.2 88.1l150.7 154.5-35.6 218c-4.1 25.2 3 50.7 19.5 70.1 16.6 19.5 40.7 30.7 66.2 30.7 14.6 0 29.1-3.8 42-10.9l181-100 181 100.1c12.9 7.1 27.4 10.9 42 10.9 25.5 0 49.6-11.2 66.2-30.7 16.5-19.4 23.6-44.9 19.5-70.1l-35.6-218 150.7-154.5c22.8-23.4 30.5-57.2 20.2-88.2z"></path></svg>
             `
module.exports.star = star;