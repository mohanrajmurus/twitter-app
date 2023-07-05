export default function reducer(state,action){
    switch(action.type){
        case 'SET__USER':
            return {...state,user:action.payload}
        case 'LOG__OUT':
            return {user:action.payload}
        default:
            return state
    }
}