// generated on 2016-09-10 using generator-webapp 2.0.0
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();

gulp.task('scripts', function () {
	gulp.src(['./app/scripts/Pxlml.dataManager.js','./app/scripts/Pxlml.officeGraphUtility.js','./app/scripts/loader.js'])
		.pipe($.concat('custom.js'))
		//.pipe($.uglify({
		//	"mangle": false,
		//	"compress": false
		//}))
		.pipe(gulp.dest('./dist'))
		.pipe(gulp.dest('./solution/templates/SiteAssets'));
})

gulp.task('serve', ['scripts'], function () {
	browserSync({
		notify: false,
		ui: false,
		open:false,
		server: {
			baseDir: ['app'],
			routes: {
			'/SiteAssets': './solution/templates/SiteAssets'
			}
		},
		https: true
	});

	gulp.watch('app/scripts/*.js', ['scripts']);
})