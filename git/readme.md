### rebase

> doc:
>
> ​	https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA



* 是什么?

  ：整合分叉的历史commit

* 为什么？

  使历史commit不会分叉，保持提交历史的整洁性

* 怎么使用？

  现有分支：`master feature1`

  现状：master有其他同事提交的log，feature1有自己的提交

  **目的**：使用rebase将feature1合并到master

  ```base
  // 当前分支：feature1
  git rebase master
  git checkout master
  git merge feature1
  ```

  rebase执行2步：将基地指向master分支最新commit，然后将feature1的commit一点点修补过来，这时候feature1有master的最新commit并且处于同条线上，切换到master，将feature1的commit快进合并到master上，完成分支合并。