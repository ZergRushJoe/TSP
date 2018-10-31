import React from "react";
import { connect } from "react-redux";

const _Root = ({path}) => {
    return (<div>{path}</div>)
};

const mapStateToProps = state =>
({
    path: state.route.path
});

const mapDispatchToProps = dispatch =>
({

});

const Root = connect(mapStateToProps,mapDispatchToProps)(_Root);

export default Root;