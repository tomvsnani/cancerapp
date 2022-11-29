export default function Login({
  elementsChanged,
  loginSubmitClicked,
  isInLoginPage,
  toggleLoginRegister,
  errormessage,username,password,fullname,email
}) {
  // console.log("rendered login");
  // console.log(errormessage+" , "+JSON.stringify(isInLoginPage))
  return (
    <div>
      
      <form
        className="d-flex flex-column align-items-center"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();

          loginSubmitClicked();
        }}
      >
        <h3 >{errormessage}</h3>
        <h1>Login</h1>
        <input
        name="username"
          type="text"
          id="username"
          value={username}
          placeholder="Enter your username"
          className="p-3 my-2"
          onChange={elementsChanged}
        />
        {!isInLoginPage && (
          <>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={fullname}
              placeholder="Enter your FullName"
              className="p-3 my-2"
              onChange={elementsChanged}
            />

            <input
             name="email"
              type="email"
              id="email"
              value={email}
              placeholder="Enter your Email"
              className="p-3 my-2"
              onChange={elementsChanged}
            />
          </>
        )}
        <input
         name="password"
          type="password"
          id="password"
          value={password}
          placeholder="Enter your password"
          className="p-3 my-2"
          onChange={elementsChanged}
        />

        <button type="submit"  className="my-2 btn btn-info text-white " disabled={errormessage}>
          {!isInLoginPage ? "Register" : "Login"}
        </button> 
        {isInLoginPage ? (
          <p onClick={toggleLoginRegister}>
            Already Logged in ? <a href="#">Create Account </a>
          </p>
        ) : (
          <p onClick={toggleLoginRegister}>
            Already Registered  ? <a href="#">Login </a>
          </p>
        )}
      </form>
    </div>
  );
}
