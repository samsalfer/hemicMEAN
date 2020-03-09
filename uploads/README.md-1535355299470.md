<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <base href="/">
    <title>ITC-Bio</title>
     <link rel="shortcut icon" href="assets/images/logonavegador.ico">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

</head>
<body>
<script src="../node_modules/chart.js/dist/Chart.min.js"></script>
<script src="../node_modules/angular-chart.js/dist/angular-chart.min.js"></script>
    <!--[if lt IE 9]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-XXXXX-X');
      ga('send', 'pageview');
    </script>

    <navbar></navbar>
    <div ui-view=""></div>
    <footer></footer>


<script type="text/javascript" src="/vendor.bundle.js"></script><script type="text/javascript" src="/polyfills.bundle.js"></script><script type="text/javascript" src="/app.bundle.js"></script></body>
</html>