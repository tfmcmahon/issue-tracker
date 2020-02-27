import React, { Component } from "react"
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { getIssues, clearAllIssues } from '../../actions/issueActions'
import PropTypes from 'prop-types'
import SingleIssue from "./SingleIssue" 
import { Accordion, AccordionItem } from "react-sanfona"

let currentProject = '',
    currentProjectArr = ''

class Issues extends Component {
    constructor() {
        super()
        this.state = { }
    }
    componentDidMount() {
        currentProject = window.location.pathname.replace(/\/dashboard\//, "")
        currentProjectArr = currentProject.split("/")
        const projectData = {
            user: currentProjectArr[0],
            project: currentProjectArr[1]
        }
        this.props.getIssues(projectData)
    }

    componentWillUnmount() {
        this.props.clearAllIssues()
    }

    componentDidUpdate(prevProps) {
        if((prevProps.issues.issue) && this.props.issues.issue !== prevProps.issues.issue && this.props.issues.isEdit===false) {
            currentProject = window.location.pathname.replace(/\/dashboard\//, "")
            currentProjectArr = currentProject.split("/")
            const projectData = {
                user: currentProjectArr[0],
                project: currentProjectArr[1]
            }
            this.props.getIssues(projectData)
        }
      }

    render () {
        const { issues } = this.props.issues
        const issuesOpen = issues.filter(item => item.open !== 'false')
        const issuesClosed = issues.filter(item => item.open === 'false')
          
        return (
            <div className="issues">
                <div className="issuesOpen">
                    <h3>OPEN</h3>
                    <div className="horizontalRuleIssues"></div>
                    {issuesOpen.length > 0 &&
                        <Accordion allowMultiple>
                            {issuesOpen.map(item => {
                                return (
                                    <AccordionItem
                                        duration={null}
                                        easing={null}
                                        key={item._id}
                                        title={`${item.issue_title}`}
                                        expanded={item === issuesOpen[0]}
                                    >
                                        <SingleIssue item={item} key={item._id}/>
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    }
                </div>
            <div className="verticalRule"></div>
                <div className="issuesClosed">
                    <h3>CLOSED</h3>
                    <div className="horizontalRuleIssues"></div>
                    {issuesClosed.length > 0 &&
                        <Accordion allowMultiple>
                            {issuesClosed.map(item => {
                                return (
                                    <AccordionItem
                                        duration={null}
                                        easing={null}
                                        key={item._id}
                                        titleClassName="closedItemTitle"
                                        bodyClassName="closedItem"
                                        expandedClassName="closedPane"
                                        title={`${item.issue_title}`}
                                    >
                                        <SingleIssue item={item} key={item._id}/>
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    }
                </div>
                <div className="blueFill"></div>
            </div>
        )
    }
}

Issues.propTypes = {
    auth: PropTypes.object.isRequired,
    issues: PropTypes.object.isRequired,
    getIssues: PropTypes.func.isRequired,
    clearAllIssues: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    issues: state.issues,
    isEdit: state.isEdit,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { logoutUser, getIssues, clearAllIssues }
)(Issues)