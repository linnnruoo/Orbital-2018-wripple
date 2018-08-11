// this is for query @ search bar
// parse url -> query and filter
const express = require('express');
const router = express.Router();

// load model
const Project = require('../../models/Project');

// @route Get api/search/projects/query
// @desc query and filter the project
// @access Public for now
router.get('/projects/query', (req, res) => {
    console.log(req.query);
    
    // pagination
    const num_per_page = 5;
    const page_id = parseInt(req.query.page);
    var total_pages;

    // checking for search result
    const regex_search = new RegExp(escapeRegex(req.query.search), 'gi');
    
    // fuzzy search by keywords
    Project.find({ title: regex_search }).count()
        .then(count => {
            total_pages = Math.ceil(count / num_per_page);
            Project.find({ title: regex_search })
                .skip((num_per_page * page_id) - num_per_page)
                .limit(num_per_page)
                .sort({ date: -1 })
                .then(projects => res.json({
                    total: total_pages,
                    projects: projects
                }))
                .catch(err => res.status(404).json("No projects found"));
        })
        .catch(err => console.log(err));
});


// @route Get api/search/projects/test_query
// @desc query and filter the project
// @access Public for now
router.get('/projects/test_query', (req, res) => {
    console.log(req.query);
    
    // pagination
    const num_per_page = 5;
    const page_id = parseInt(req.query.page);
    var total_pages;

    // checking for search result
    const regex_search = new RegExp(escapeRegex(req.query.search), 'gi');
    const regex_role = new RegExp(escapeRegex(req.query.role), 'gi');
    const regex_size = new RegExp(escapeRegex(req.query.size), 'gi');
    const regex_com_lvl = new RegExp(escapeRegex(req.query.com_lvl), 'gi');

    // fuzzy search by keywords
    Project.find({ title: regex_search, looking_for: regex_role, team_size: regex_size, commitment_lvl: regex_com_lvl }).count()
        .then(count => {
            total_pages = Math.ceil(count / num_per_page);
            Project.find({ title: regex_search, looking_for: regex_role, team_size: regex_size, commitment_lvl: regex_com_lvl })
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