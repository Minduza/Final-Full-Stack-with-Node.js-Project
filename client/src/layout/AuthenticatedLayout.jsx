const AuthenticatedLayout = ({ children }) => {
  return (
    <>
      <h1>Hello from Authenticated layout</h1>
      <div>{children}</div>
    </>
  );
};

export default AuthenticatedLayout;
