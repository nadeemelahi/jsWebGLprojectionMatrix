/*
 * author: Nadeem Elahi
 * nadeem.elahi@gmail.com
 * nad@3deem.com
 * license: gpl v3
 */
"use strict"; 

var gl = ngl.get_gl();

var cw = ngl.get_cw() , 
ch = ngl.get_ch();

var x0 = 0 , y0 = 0;

var clr = [ 1.0 , 0.5 , 0.1 ];
ngl.configureDraw( clr , x0 , y0 , cw , ch );

// 3 x 3D(x,y,z) geometry vertices 
// 3 x 3D(red,green,blue) colour channels 
var startIdx = 0;
var dimVec = 4;
var dimClr = 3;

/*
function genTriangle( sx , sy ){
	return new Float32Array ( [
		-sx , -sy , 0 , 1 ,
		 sx , -sy , 0 , 1 ,
		 sx ,  sy , 0 , 1 ,
	] )
}
var verts = genTriangle ( 0.5 , 1 );
*/

function genRect( blx , bly , // bottom left x/y
	width , height ) {
	return new Float32Array ( [
		blx         , bly          , 0 , 1 ,
		blx + width , bly          , 0 , 1 ,
		blx + width , bly + height , 0 , 1 , 

		blx         , bly          , 0 , 1 ,
		blx + width , bly + height , 0 , 1 , 
		blx         , bly + height , 0 , 1 , 
	] ) 
}


//var verts = genRect ( -1 , -1 , 2 , 2 ) ;


/*
*/
var verts = genRect ( 0 , 0 , cw , ch ) ;
var xScale = 2/cw , yScale = 2/ch , zScale = 1;

var xTranslation = -1 , 
	yTranslation = -1, 
	zTranslation = 0;

//var matScale = nmg.genScaleMatrix( xScale , yScale , zScale ); var matTranslation = nmg.genTranslationMatrix ( xTranslation , yTranslation , zTranslation ); nmm.multiply1x4times4x4 ( verts , matScale ) ; nmm.multiply1x4times4x4 ( verts , matTranslation ) ;

var matProj = nmg.genProjMatrix (
	xTranslation , yTranslation , zTranslation ,
	xScale , yScale , zScale
);
nmm.multiply1x4times4x4 ( verts , matProj );


nmm. print4Dvector(verts);


var cnt = verts.length / 4;

var colours =  new Float32Array( [ 
		1,0,0  ,  
		1,0,0  ,  
		1,0,0  ,  

		1,0.1,0  ,  
		1,0.1,0  ,  
		1,0.1,0  ,  

] );


//console.log("---");
//nmm.print4Dvector ( verts ) ;

ngl.loadAttribute ( "vert" , verts , dimVec );
ngl.loadAttribute ( "colour" , colours , dimClr );

function drawframe(){

	//gl.clear(gl.COLOR_BUFFER_BIT);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, startIdx, cnt);


}
drawframe();

