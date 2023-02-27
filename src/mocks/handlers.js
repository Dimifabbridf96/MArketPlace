import { rest } from "msw"

const baseURL = "https://marketplaceapi.herokuapp.com/"

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res,ctx) => {
        return res(ctx.json({
            pk: 4,
            username: "dimi",
            email: "",
            first_name: "",
            last_name: "",
            profile_id: 4,
            profile_image: "https://res.cloudinary.com/de9jezwh1/image/upload/v1/media/../default-avatar-icon"
            })
            );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req,res,ctx) => {
        return res(ctx.status(200));
    })
]