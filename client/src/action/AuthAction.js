
import * as AuthApi from '../api/AuthRequest'

export const logIn = (formData) =>  async(dispatch) => {
    const {data} = await AuthApi.logIn(formData)
}