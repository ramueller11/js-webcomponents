function webkitReadFilelist( fileItems, oncomplete ){
  var files = [];

  /* recursive reader */
  function read_entry( entry ){
    if ( entry.isFile ) { 
      entry.file(  function(f){ files.push(f); } ); 
      return;
    }
    if ( ! ( entry.isDirectory )) return;

    var children = [];
    entry.createReader().readEntries( 
        function ( entries ){ 
          for( var i = 0; i < entries.length; i++ ) 
            read_entry(entries[i]);
        }
    );

    return;
  }

  function progressCheck( lastFileCnt, iteration ){

    if ( lastFileCnt != files.length ) 
      iteration = 0; 
    else
      iteration += 1;

    console.log('progressCheck', lastFileCnt, iteration );

    if ( iteration < 10 ){
      setTimeout( progressCheck.bind(this, files.length, iteration), 50 );
      return;
    }

    oncomplete( files );
  }

  for ( var i = 0; i < fileItems.length; i++ ){
    read_entry( fileItems[i].webkitGetAsEntry() );
  }

  progressCheck();
}

webkitReadFilelist( root, function(files){ console.log(files); } );