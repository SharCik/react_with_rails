var EventApplication = React.createClass({
  getInitialState: function() {
    return {events: [] };
  },
  componentDidMount: function() {
    this.getDataFromApi();
  },
  getDataFromApi: function() {
    var self = this;
    $.ajax({
      url: '/api/events',
      success: function(data) {
        self.setState({ events:data });
      },
      error: function(xhr,status,error){
        alert('Cannot get data from API: ',error);
      }
    })
  },
  render: function() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Tutorial</h1>
          <p>Stas Zelenko</p>
        </div>
        <div className="row">
          <div className="col-md-12">
            <EventTable events={this.state.events}/>
          </div>
        </div>
      </div>
    )
  }
});


var EventTable = React.createClass({
  render: function() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="col-md-3">Name</th>
            <th className="col-md-2">Date</th>
            <th className="col-md-3">Place</th>
            <th className="col-md-4">Description</th>
          </tr>
        </thead>
        <tbody>
          <Event name="new_event" />
        </tbody>
      </table>
    )
  }
});

var Event = React.createClass({
  propTypes:{
    name: React.propTypes.string,
    event_date: React.propTypes.string,
    place: React.propTypes.string,
    description: React.propTypes.string,
  },
  render: function() {
    var event = this.props.event;
    return(
      <tr>
        <td>{event.name}</td>
        <td>{event.event_date}</td>
        <td>{event.place}</td>
        <td>{event.description}</td>
      </tr>
    )
  }
});