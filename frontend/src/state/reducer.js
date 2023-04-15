
export const initilastate = {
    profile: null,
    pagereload: null,
    cart_uncomplete: null,
    cart_complete: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "PAGE_RELOAD":
            return {
                ...state,
                pagereload: action.pagereload
            }

        case "CARTPRODUCT_UNCOMPLETE":
            return {
                ...state,
                cart_uncomplete: action.cart_uncomplete
            }
        case "CARTPRODUCT_COMPLETE":
            return {
                ...state,
                cart_complete: action.cart_complete
            }

        default:
            return state
    }
}

export default reducer