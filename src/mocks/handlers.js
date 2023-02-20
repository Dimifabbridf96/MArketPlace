import { rest } from "msw"

const baseURL = "https://marketplaceapi.herokuapp.com/"

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res,ctx) => {
        return res(ctx.json())
    })
]