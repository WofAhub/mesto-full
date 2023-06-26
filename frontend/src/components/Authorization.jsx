import React from "react";

function Authorization({
  title,
  children,
  registerChildren,
  buttonName,
  onSubmit,
  idAuth,
  name
}) {
  return (
    <div className="root">
      <div className="page">
        <main className="content">
          <div className="authorization">
            <div className="authorization__form-content">
              <div className="authorization__form-box">
                <h1 className="authorization__heading">{title}</h1>
                <form id={idAuth} name={name} className="authorization__form" onSubmit={onSubmit}>
                  <fieldset className="authorization__form-fieldset">
                    {children}
                  </fieldset>
                  <button type='submit' className="button button_type_authorization">
                    {buttonName}
                  </button>
                </form>
              </div>
              {registerChildren}
              </div>
            </div>
        </main>
      </div>
    </div>
  );
}

export default Authorization;
