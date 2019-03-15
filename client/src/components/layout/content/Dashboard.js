import React, { Component } from 'react';
import ShiftItem from './shifts/ShiftItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getShifts } from '../../../actions/shiftActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getShifts();
  }

  render() {
    const { workShift } = this.props;

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {workShift.workShifts.map(workShift => <ShiftItem key={workShift._id} workShifts={workShift} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  workShift: PropTypes.object.isRequired,
  getShifts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  workShift: state.workShift
});

export default connect(mapStateToProps, { getShifts })(
  Dashboard
);
