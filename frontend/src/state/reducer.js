
export const initilastate = {
    profile: null,
}

const reducer = (action, state) => {
    switch (action.type) {
        case "ADD_PROFILE":
            return {
                ...state,
                profile: action.payload
            }

        default:
            return state
    }
}

export default reducer