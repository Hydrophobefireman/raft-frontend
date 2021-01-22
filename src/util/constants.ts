export const devHost = "http://localhost:5000";

export const prodHost = "https://raft-backend-dev.herokuapp.com/";

export const devMode = location.hostname.includes("localhost");

export const host = devMode ? devHost : prodHost;
