<!doctype html>
<!--[if lte IE 8]><html class="lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--><html><!--<![endif]-->
<head>
    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="apple-mobile-web-app-capable" content="yes" />

    <title><%= site_name %> : <?php echo $page_title; ?></title>

    <?php if(isset($meta_desc) && $meta_desc != '') { ?><meta name="description" content="<?php echo $meta_desc; ?>" /><? } ?>
    <?php if(isset($meta_keywords) && $meta_keywords != '') { ?><meta name="keywords" content="<?php echo $meta_keywords; ?>" /><? } ?>

    <link rel="shortcut icon" href="assets/images/favicon.ico" type="image/x-icon" />

    <link rel="stylesheet" href="assets/css/main.css" />

    <% if (include_Respond) { %><!--[if lte IE 8]><script type="text/javascript" src="assets/js/vendor/respond.js"></script><link rel="stylesheet" href="assets/css/ie.css" /><![endif]--><% } else { %><!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie.css" /><![endif]--><% } %>

    <script type="text/javascript" src="assets/js/vendor/modernizr.js"></script>
</head>
<body>

    <header>
        <h1>FRED Front End Starter Kit</h1>
        <h2>by Jason Rector</h2>
    </header>

    <div id="content">