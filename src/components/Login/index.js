import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {userID: '', pin: '', errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    this.setState({errorMsg: ''})
    Cookie.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  onClickLogin = async event => {
    event.preventDefault()

    const {userID, pin} = this.state
    const userDetails = {user_id: userID, pin}

    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.status === 200) {
      console.log(data)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      console.log(data)
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserID = event => this.setState({userID: event.target.value})

  onChangePin = event => this.setState({pin: event.target.value})

  render() {
    const {userID, pin, errorMsg} = this.state

    const jwtToken = Cookie.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="container">
          <div className="login-container">
            <div className="login-image">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
                alt="website login"
                className="website-login"
              />
            </div>
            <form className="login-details" onSubmit={this.onClickLogin}>
              <h1 className="login-heading">Welcome Back!</h1>
              <label className="label" htmlFor="userID">
                User ID
              </label>
              <div className="input-container">
                <input
                  id="userID"
                  type="text"
                  placeholder="Enter User ID"
                  onChange={this.onChangeUserID}
                  value={userID}
                  className="input"
                />
              </div>
              <label className="label" htmlFor="pin">
                PIN
              </label>
              <div className="input-container">
                <input
                  id="pin"
                  type="password"
                  placeholder="Enter PIN"
                  onChange={this.onChangePin}
                  value={pin}
                  className="input"
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              <p className="error-msg">{errorMsg}</p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
