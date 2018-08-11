const express = require('express');
const router = express.Router();
const passport = require('passport');

// load validation
const validateProjectInput = require('../../validation/project_edit');

// load model
const Project = require('../../models/Project');
const Profile = require('../../models/Profile');
const Request = require('../../models/Request');

// @route Post api/project/create
// @desc create new project
// @access Private
router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newProject = new Project({
        user: req.user.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        university: req.body.university,
        title: req.body.title,
        subtitle: req.body.subtitle,
        summary: req.body.summary,
        details: req.body.details,
        looking_for: req.body.looking_for,
        team_size: req.body.team_size,
        commitment_lvl: req.body.commitment_lvl
    });

    newProject.save()
        .then(project => res.json(project))
        .catch(err => console.log(err));
});

// @route Get api/project/view/:project_id/
// @desc view a project by id
// @access Public
router.get('/view/:project_id', (req, res) => {
    Project.findById(req.params.project_id)
        .then(projects => res.json(projects))
        .catch(err => res.status(404).json({noProjectFound: "No project found"}));
})

// @route Delete api/project/:project_id
// @desc delete a project
// @access Private
router.delete('/view/:project_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id})
        .then(profile => {
            Project.findById(req.params.project_id)
                .then(project => {

                    // Check for project owner
                    if(project.user.toString() !== req.user.id) {
                        return res.status(401).json({ notAuthorised: 'User not authorised' });
                    }

                    // Delete
                    project.remove()
                        .then(() => res.json({ deleted: true }));
                        
                })
                .catch(err => res.status(404).json({ noProjectFound: 'No project found' }));
        });
});

// @route Post api/project/user/:user_id
// @desc display all the projects created by this user
// @access Private
router.get('/user/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    //find projects created by the user with that particular user_id & list of collaborators (in which the user is involved in)
    //find the requests of the user
    let total_requests, requests;

    // find request
    Request.find({owner: req.user.id})
        .then(request => {
            total_requests = request.length;
            requests = request;
        })
        .catch(err => {
            total_requests = 0;
            requests = null;
        });
    
    // find projects in collaborations
    Project.find({ "collaborators.collaborator_id": req.params.user_id })
        .then(projects => {
            const collab_proj = projects;

            Project.find({ user: req.params.user_id })
                .sort({ date: -1 })
                .then(projects => {
                    var i;
                    var archived_projects = [];
                    var my_ongoing = [];

                    for (i=0; i<projects.length; i++) {
                        if (projects[i].isArchived) {
                            archived_projects.push(projects[i]);
                        } else {
                            my_ongoing.push(projects[i]);
                        }
                    }
                    
                    const ongoing_projects = collab_proj.concat(my_ongoing);

                    res.json({
                        total_requests: total_requests,
                        requests: requests,
                        total: projects.length,
                        projects: projects,
                        archived_projects: archived_projects,
                        archived_total: archived_projects.length,
                        ongoing_projects: ongoing_projects,
                        ongoing_total: ongoing_projects.length
                    })
                })
                .catch(err => res.status(404).json({noProjectFound: "No project found for this user"}));    
            
        })
        .catch(err => console.log(err));

});

// @route Post api/project/view/:project_id
// @desc edit project
// @access Private
router.post('/view/:project_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Get fields
    const projectFields = {};
    if (req.body.title) projectFields.title = req.body.title;
    if (req.body.subtitle) projectFields.subtitle = req.body.subtitle;
    if (req.body.summary) projectFields.summary = req.body.summary;
    if (req.body.details) projectFields.details = req.body.details;
    if (req.body.looking_for) projectFields.looking_for = req.body.looking_for;
    if (req.body.team_size) projectFields.team_size = req.body.team_size;
    if (req.body.commitment_lvl) projectFields.commitment_lvl = req.body.commitment_lvl;
    
    Project.findById(req.params.project_id)
        .then(project => {
            if(project) {
                //check for owner
                if(project.user.toString() !== req.user.id) {
                    return res.status(401).json({ notAuthorised: 'User not authorised' });
                }
                
                //update
                Project.findOneAndUpdate(
                    { _id: req.params.project_id }, 
                    { $set: projectFields }, 
                    { new: true }
                )
                .then(project => {res.json(project)});
            } else {
                return res.status(404).json("Project Not Found");
            }
        });
});

// @route Post api/project/archive/:project_id
// @desc archive project once the host thinks that it is complete
// @access Private
router.post('/archive/:project_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const projectFields = {};
    projectFields.isArchived = 1;

    Project.findById( req.params.project_id )
        .then(project => {
            if(project) {
                //update
                Project.findOneAndUpdate(
                    { _id: req.params.project_id }, 
                    { $set: projectFields }, 
                    { new: true }
                )
                .then(project => {res.json(project)});
            } else {
                return res.status(404).json("Project Not Found");
            }
        });
});

// @route Post api/project/apply
// @desc apply for a particular project
// @access Public
router.post('/apply', passport.authenticate('jwt', { session: false}), (req, res) => {
    const newRequest = new Request({
        user: req.user.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        owner: req.body.owner,
        project_title: req.body.project_title,
        project_id: req.body.project_id,
        message: req.body.message,
        role: req.body.role
    });

    newRequest.save()
        .then(request => res.json(request))
        .catch(err => res.status(400).json("Cannot be saved"));
    
});


// @route Post api/project/accept/:request_id
// @desc accept/reject colaboration request => either of which will delete the request
// @access Private
router.post('/accept/:request_id', passport.authenticate('jwt', { session: false}), (req, res) => {
    Request.findById( req.params.request_id )
        .then(request => {
            let  new_list = [];
            
            // get the project by id then load the current collaborators list
            Project.findById( request.project_id )
                .then(project => {
                    new_list = project.collaborators;
                    
                    // check against the choice made by the owner of the project
                    if (req.body.choice === "1") {
                        const new_person = {};

                        new_person.collaborator_id = request.user;
                        new_person.first_name = request.first_name;
                        new_person.last_name = request.last_name;
                        new_person.role = request.role;
                        
                        new_list.push(new_person);
                        
                        // assign the list of collaborators with the new list
                        Project.findOneAndUpdate(
                            { _id: request.project_id }, 
                            { $set: { collaborators: new_list }}, 
                            { new: true }
                        )
                        .then()
                        .catch(err => res.status(404).json("Failed to locate the project"));

                    }

                })
                .catch(err => res.status(404).json("No Project Found"))
            

            // Delete
            request.remove()
                .then(() => res.json({deleted: 'true'}));
        })
        .catch(err => res.status(404).json("No request found."))
});

// @route Get api/project/recent_posts/:user_id
// @desc view related posts
// @access Public
router.get('/recent_posts/:user_id', (req, res) => {
    Project.find({user: req.params.user_id})
        .sort({date: -1})
        .limit(3)
        .then(projects => res.json(projects))
        .catch(err => console.log(err));
})

module.exports = router;