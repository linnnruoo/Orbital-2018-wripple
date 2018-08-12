// this is for query @ search bar + filter column
// parse url -> query and filter
const express = require('express');
const router = express.Router();

// load model
const Project = require('../../models/Project');

// @route Get api/search/projects/test_query2
// @desc query and filter the project
// @acknowledgement great thanks to Adrian for debugging this for us
// @access Public for now
router.get('/projects/query', (req, res) => {
    // all queries except search will be done by sending array over

    // get the query information
    var queryParams = {
        "title": req.query.search,
        "looking_for": req.query.role,
        "commitment_lvl": req.query.com_lvl,
        "team_size": req.query.size
    }
    
    // constraints to be searched and filtered later
    var constraints = {}

    for (const key of Object.keys(queryParams)) {
        if (queryParams[key]) { // if there are requests for this query param
            if (key !== "title") {
                var constraint = {
                    $in: queryParams[key].split(" ")
                }
    
                constraints[key] = constraint;

            } else {  
                // check for title for fuzzy search for title
                constraints[key] =  new RegExp(escapeRegex(req.query.search), 'gi');
            }
        }
    }

    console.log(constraints);

    // pagination
    const num_per_page = 5;
    const page_id = parseInt(req.query.page);
    var total_pages;

    // Find in Project collection
    Project.find(constraints)
    .count()
    .then(count => {
        total_pages = Math.ceil(count / num_per_page);
        
        // For pagination -> display 5 projects at that specific page
        Project.find(constraints)
        .skip((num_per_page * page_id) - num_per_page)
        .limit(num_per_page)
        .sort({ date: -1 })
        .then(projects => {
            res.json({
                total: total_pages,
                projects: projects
            })
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));

});


// plugin to handle query string for fuzzy search
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;