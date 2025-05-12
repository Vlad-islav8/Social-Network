export const withProfileRedirect = (Component) => {
    const mapStateToProps = (state) => {
        isAuth: state.auth.isAuth
    }
    return <Component />    
} 