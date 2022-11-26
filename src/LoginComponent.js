export default function Login({
  elementsChanged,
  loginSubmitClicked,
  isInLoginPage,
  toggleLoginRegister,
  errormessage
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
          placeholder="Enter your username"
          className="p-3 my-2"
          onChange={elementsChanged}
        />
        {!isInLoginPage && (
          <>
            <input
              type="text"
              name="fullname"
              placeholder="Enter your FullName"
              className="p-3 my-2"
              onChange={elementsChanged}
            />

            <input
             name="email"
              type="email"
              placeholder="Enter your Email"
              className="p-3 my-2"
              onChange={elementsChanged}
            />
          </>
        )}
        <input
         name="password"
          type="password"
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
