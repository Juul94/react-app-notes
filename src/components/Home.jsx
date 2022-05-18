export default function Profile(props) {
  return (
    <section id="content-wrapper" className="userProfile">
      <div className="row">
        <div className="col-lg-12">
          <h1 className="h1--title">Welcome</h1>
          <p className="mb-1">
            <i className="fa-solid fa-user"></i> {props.data.displayName}
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i> {props.data.email}
          </p>
        </div>
      </div>
    </section>
  );
}
