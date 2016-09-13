var EventApplication = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Tutorial</h1>
          <p>Stas Zelenko</p>
        </div>
        <div className="row">
          <div className="col-md-12">
            <EventTable />
          </div>
        </div>
      </div>
    )
  }
});