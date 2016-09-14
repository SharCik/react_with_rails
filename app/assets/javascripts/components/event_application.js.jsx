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
  _handleSearch: function(events) {
    this.setState({ events: events });
  },
  handleAdd: function (event){
    var events = this.state.events;
    events.push(event);
    this.setState({ events: events});
  },
  _removeEvent: function(events) {
    this.setState({ events: events }); 
  },
  render: function() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Tutorial</h1>
          <p>Stas Zelenko</p>
        </div>
        <div className="row">
          <div className="col-md-2">
            <SearchForm handleSearch={this._handleSearch} />
          </div>
          <div className="col-md-10">
            <NewForm handleAdd={this.handleAdd} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <EventTable events={this.state.events} removeEvent={this._removeEvent}/>
          </div>
        </div>
      </div>
    )
  }
});


var EventTable = React.createClass({
  render: function() {
    var events = [];
    this.props.events.forEach(function(event) {
      events.push(<Event event={event} removeEvent={this.props.removeEvent}
                         key={'event' + event.id}/>);
    }.bind(this));
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="col-md-3">Name</th>
            <th className="col-md-2">Date</th>
            <th className="col-md-3">Place</th>
            <th className="col-md-3">Description</th>
            <th className="col-md-1"></th>
          </tr>
        </thead>
        <tbody>
          {events}
        </tbody>
      </table>
    )
  }
});

var Event = React.createClass({
  propTypes:{
    name: React.PropTypes.string,
    event_date: React.PropTypes.string,
    place: React.PropTypes.string,
    description: React.PropTypes.string,
  },
  deleteEvent: function(event_id) {
    var event_id = event_id;
        self = this;
    $.ajax({
        method: 'DELETE',
        url: "api/events/"+ event_id,
        data: { event: event_id },
      success: function(data) {
        self.props.removeEvent(data);
      },
      error: function(xhr,status,error){
        
      }
    })
  },
  render: function() {
    var event = this.props.event;
    return(
      <tr>
        <td>{event.name}</td>
        <td>{event.event_date}</td>
        <td>{event.place}</td>
        <td>{event.description}</td>
        <td><button className="btn btn-danger"
                    onClick = {() => { this.deleteEvent(event.id)}}>
                    Remove
                    </button>
        </td>
      </tr>
    )
  }
});

var SearchForm = React.createClass({
  eventsSearchForm: function() {
    var query = ReactDOM.findDOMNode(this.refs.query).value;
    var self = this;
    $.ajax({
      url: 'api/events/search',
      data: {query: query},
      success: function(data) {
        self.props.handleSearch(data);
      },
      error: function(xhr, status, error) {
        alert('search error: ', status, xhr, error);
      }
    });
  },
  render: function() {
    return(
      <input onChange = {this.eventsSearchForm}
             type = "text"
             className = "form-control"
             placeholder = "Type search phrase here..."
             ref = "query" />
    )
  }
});


var NewForm = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    event_date: React.PropTypes.string,
    place: React.PropTypes.string,
    description: React.PropTypes.string,
  },
  getInitialState: function() {
    return {
      name: '',
      place: '',
      event_date: '',
      description: ''
    }
  },
  AddEvent: function(e) {
    e.preventDefault();
    var self = this;
    if (this.validForm()) {
      $.ajax({
        url: 'api/events',
        method: 'POST',
        data: { event: self.state },
        success: function(data) {
          self.props.handleAdd(data);
          self.setState(self.getInitialState());
        },
        error: function(xhr, status, error) {
          alert('Can not add a new record: ', error);
        }
      })
    } else {
      alert('Please fill all fields!');
    }
  },
  validForm: function() {
    if (this.state.name && this.state.place && this.state.event_date && this.state.description) {
      return true;
    } else {
      return false;
    }
  },
  handleChange: function(e){
    var input_name = e.target.name,
        value = e.target.value;
        this.setState({ [input_name] : value });
  },
  render: function() {
    return(
      <form className="form-inline" onSubmit={this.AddEvent}>
        <div className="form-group">
          <input type="text"
                 className = "form-control"
                 name="name"
                 placeholder="Name"
                 ref="name"
                 value={this.state.name}
                 onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="text"
                 className = "form-control"
                 name="place"
                 placeholder="place"
                 ref="place"
                 value={this.state.place}
                 onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="date"
                 className = "form-control"
                 name="event_date"
                 placeholder="Event date"
                 ref="event_date"
                 value={this.state.event_date}
                 onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="text"
                 className = "form-control"
                 name="description"
                 placeholder="Description"
                 ref="description"
                 value={this.state.description}
                 onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    )
  }
});
