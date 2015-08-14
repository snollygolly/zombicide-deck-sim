module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
    connect: {
      public: {
        options: {
          // The server's port, and the folder to serve from:
          // Ex: 'localhost:9000' would serve up 'client/index.html'
          port: 9000,
          base:'public'
        }
      }
    },
    watch: {
      public: {
        // '**' is used to include all subdirectories
        // and subdirectories of subdirectories, and so on, recursively.
        files: ['public/**/*']
      }
    }
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['connect:public', 'watch:public']);
};
