git config user.name "seo2im"
git config user.email "seo2im6492@gmail.com"
git add .
git commit -m "deploy"

git subtree push --prefix client/app/build origin gh-pages
git push origin fronted