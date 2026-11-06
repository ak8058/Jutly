const sendToken = (user, statusCode, res, rememberMe = true) => {
  const token = user.getJwtToken();

  const options = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  // Persistent cookie only when the user explicitly chooses Remember me.
  if (rememberMe) options.expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

  return res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

export { sendToken };
