# Frontend

Managing scalability on the frontend would mostly involve offloading some information to backend, making repeated API calls to our caching server instead of keeping large amounts of data in memory.

First step would be to allow for pagination. The current website shows every user there is. Great for small data, but as soon as we hit more than 100 users, this will be bad for both our server and the UX.

The current Frontend uses no other dependencies other than the UI library. Since we have the data structures available, we can easily port our to use a charting library on the frontend for smooth UI and UX

The frontend uses multiple techniques, along with using a build time css compiler ([made by me](https://github.com/hydrophobefireman/catom)) to inline critical css, to reach perfect lighthouse scores.
