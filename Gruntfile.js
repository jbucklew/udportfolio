module.exports = function( grunt ){
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),

        // Minimize css files - minimizing print.css and bootstrap-grid.css
        // print.css is not needed during the initial rendering and
        // style.css is being included into the appropriate html file
        // to save a download since it is a small file
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: [ '**/print.css', 'views/css/bootstrap-grid.css' ],
                    dest: 'production/',
                    ext: '.min.css',
                    extDot: 'first'
                }]
            }
        },
                
        // Minimize js files - Only minimizing perfmatters.js
        // view/js/main.js will get included into pizza.html to save a download
        // and because it is needed before the DOM can be completed
        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: [ 'js/*.js' ],
                    dest: 'production/',
                    ext: '.min.js',
                    extDot: 'first'
                }]
            }
        },

        // Minimize and Compress images
        // imagemin fails when compressing pizzeria.jpg so I did this manually at
        // compressjpeg.com.  This will compress all images in the img/ directory
        // and the 2 images listed under views/images
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: [ 'img/*.{png,jpg,gif}', 'views/images/pizza.png', 'views/images/pizzeriasm.jpg' ],
                    dest: 'production/'
                }]
            }
        },

        // Since imagemin fails to compress pizzeria.jpg it needs to move to production
        // we still need to move the manually minimized image to production
        copy: {
            dist: {
                expand: true,
                cwd: 'dev/',
                src: 'views/images/pizzeria.min.jpg',
                dest: 'production/views/images/',
                flatten: true,
                filter: 'isFile'
            }
        },

        // inline external files
        // Used to include style.css and main.js into their respective html file
        // ?__inline=true will be found in the link and script tags after the file name
        inline: {
            options: {
                cssmin: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: [ '**/*.html' ],
                    dest: 'production/',
                    ext: '.html'
                }]
            }
        },

        // Used to change file names in link/script tags to point to new minified versions
        // For example, print.css becomes print.min.css (See html files)
        processhtml: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'production/',
                    src: [ '**/*.html' ],
                    dest: 'production/',
                    ext: '.html'
                }]
            }
        },

        // Minimize html files
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true
                },
                files: [{
                    expand: true,
                    cwd: 'production/',
                    src: [ '**/*.html' ],
                    dest: 'production/'
                }]
            }
        }
    });

    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
    grunt.loadNpmTasks( 'grunt-inline' );
    grunt.loadNpmTasks( 'grunt-processhtml' );
    grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.registerTask( 'default', [ 'cssmin', 'uglify', 'imagemin', 'copy', 'inline', 'processhtml', 'htmlmin' ] );
};
