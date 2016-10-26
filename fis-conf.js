
/*************************设置项目属性*****************************/
fis.set('project.name', 'effi-cli');
fis.set('project.static', '/static');
fis.set('project.base', './');
fis.set("accept.type", '**.{js,css,less,png,jpg,gif}');

// 引入模块化开发插件，设置规范为 commonJs 规范。
// 使用符合AMD规范的require.js
// 配置详解：
// baseUrl: 默认为. 即项目根目录,用来配置模块查找根目录
// paths: 用来设置别名,路径基于baseUrl设置
// shim: 可以达到不改目标文件,指定其依赖和暴露内容的效果,注意只对不满足amd的js有效
fis.hook('amd', {
    baseUrl: "./",
    paths: {
        jquery: 'lib/jquery/2.2.3/jquery.min',
        vue: "lib/vue/1.0/vue.min",
        filter: "components/filter"
    },
    shim: {
        jquery: {
            exports: "jQuery"
        }
    },
    globalAsyncAsSync: true
});

// 利用fis的loader进行模块依赖加载
fis.match('::package', {
	postpackager: fis.plugin('loader', {
		resourceType: 'amd',
		useInlineMap: true
	})
});

/*************************输出目录设置*****************************/

// 开启同名依赖
fis.match('/components/**', {
    useSameNameRequire: true
});

// lib目录直接拷贝到static目录
fis.match('/lib/**.js', {
    release: '${project.static}/$&'
});

// 编译less
fis.match('*.less', {
	parser: fis.plugin('less'),
	rExt: '.css'
});

// 将components、view中的静态文件(js,image,css)都输出到static目录，原目录只保留html
fis.match(/^\/components\/(.*)\/(.*)\.js/, {
	isMod: true,
	release: '${project.static}/js/components/$2'
});

fis.match(/^\/components\/(.*)\/(.*\.(?:png|jpg|gif))$/i, {
	isMod: true,
	release: '${project.static}/image/components/$2'
});

fis.match(/^\/components\/(.*)\/(.*\.(?:less|css))$/, {
	isMod: true,
	release: '${project.static}/css/components/$2'
});

fis.match(/^\/views\/(.*)\/(.*)\.js/, {
	release: '${project.static}/js/views/$2'
});

fis.match(/^\/views\/(.*)\/(.*\.(?:png|jpg|gif))$/i, {
	isMod: true,
	release: '${project.static}/image/views/$2'
});

fis.match(/^\/views\/(.*)\/(.*\.(?:less|css))$/, {
	isMod: true,
	release: '${project.static}/css/views/$2'
});

// 所有模板放到根目录
fis.match(/^\/views\/(.*)\/(.*)\.html$/, {
    release: './$2'
});

fis.match('*.{json,md}', {
  // 设置 release 为 FALSE，不再产出此文件
  release: false
})


/*************************开发环境*****************************/
fis.media('debug').match('${accept.type}', {
    useHash: false,
    useSprite: false,
    optimizer: null
});

/*************************生产环境*****************************/

//加指纹
fis.media('prod').match('${accept.type}', {
  useHash: true
});

//压缩
fis.media('prod')
    .match('*.js', {
      optimizer: fis.plugin('uglify-js', {
            mangle: {
                expect: ['require', 'jquery', 'avalon'] //不需要压缩的
            }
        })
    })
    .match('*.css', {
      optimizer: fis.plugin('clean-css')
    })
    .match('*.png', {
      optimizer: fis.plugin('png-compressor')
    });

//打包合并
fis.media('prod').match('::package', {
  postpackager: fis.plugin('loader', {
    allInOne: true
  })
});

//小图片合成雪碧图
fis.media('prod').match('::package', {
  spriter: fis.plugin('csssprites')
})

//自定义发布目录
fis.match('*', {
  deploy: fis.plugin('local-deliver', {
    to: '../release/'
  })
})

