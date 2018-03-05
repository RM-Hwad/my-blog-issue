const gulp = require('gulp');
const less = require('gulp-less'); //less文件解析css文件
const del = require('del'); //清理文件
const autoprefixer = require('gulp-autoprefixer'); //兼容浏览器前缀
const cleanCSS = require('gulp-clean-css'); //压缩css文件
const uglify = require('gulp-uglify'); //压缩javascript文件
const concat = require('gulp-concat'); //合并

gulp.task('clean', () => {
	del.sync('build');
});

gulp.task('less', () => {
	gulp.src('src/**/*.less')
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['last 5 versions', 'Firefox >= 20'],
			cascade: true, //是否美化属性值 默认：true 像这样：
	            		   //-webkit-transform: rotate(45deg);
	            			// transform: rotate(45deg);
	        remove:true //是否去掉不必要的前缀 默认：true 	
		}))
		.pipe(cleanCSS())
		.pipe(gulp.dest('build'));
})

gulp.task('jsmin', function () {
    gulp.src(['src/script/index.js','src/script/detail.js']) //多个文件以数组形式传入
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('jsConcat',  () => {
    gulp.src('src/script/*.js')
        .pipe(concat('all.js'))//合并后的文件名
        .pipe(gulp.dest('build/script'));
});

gulp.task('default', ['clean', 'less', 'jsConcat', 'jsmin'], () => {
	console.log('done!');
});