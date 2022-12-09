import {withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookie.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="header-container">
      <button type="button" className="website-logo-button">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </button>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
