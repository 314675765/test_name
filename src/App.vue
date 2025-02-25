<template>
  <div id="app">
    <header>
      <h1>Welcome to Vue 3</h1>
    </header>
    <main>
      <p>This is a simple Vue 3 application.</p>
    </main>
  </div>
</template>

<script lang="js">

function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj
  if (hash.has(obj)) return hash.get(obj)
  let type = Object.prototype.toString.call(obj).splice(8, -1)
  let clone
  if (type == 'Array') {
    clone = []
    obj.forEach((item, index) => {
      clone[index] = deepClone(item, hash)
    })
  } else if (type == 'Date') {
    clone = new Date(obj)
  } else if (type == 'RegExp') {
    clone = new RegExp(obj)
  } else if (type == 'Set') {
    clone = new Set()
    obj.forEach(item => clone.add(deepClone(item, hash)))
  } else if (type == 'Map') {
    clone = new Map()
    obj.forEach((val, key) => {
      clone.set(deepClone(key, hash), deepClone(val, hash))
    })
  } else if (type == 'Object') {
    clone = {}
    Reflect.ownKeys(obj).forEach(key => {
      Object.defineProperty(clone, key, {
        ...Object.getOwnPropertyDescriptors(obj),
        value: deepClone(obj[key], hash)
      })
    })
  }
  hash.set(obj, clone)
  return clone
}

class MyPromise {
  constructor(executor) {
    this.status = 'pending'; // Promise 状态
    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败的原因
    this.onFulfilledCallbacks = []; // 成功的回调队列
    this.onRejectedCallbacks = []; // 失败的回调队列

    // resolve 函数
    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        // 执行所有成功的回调
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      }
    };

    // reject 函数
    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        // 执行所有失败的回调
        this.onRejectedCallbacks.forEach((callback) => callback(reason));
      }
    };

    // 执行 executor 并捕获错误
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // 如果 onFulfilled 不是函数，则透传 value
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    // 如果 onRejected 不是函数，则抛出错误
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
          throw reason;
        };

    // 返回新的 Promise，支持链式调用
    const newPromise = new MyPromise((resolve, reject) => {
      // 处理成功状态
      const handleFulfilled = () => {
        queueMicrotask(() => {
          try {
            const result = onFulfilled(this.value);
            resolve(result)
          } catch (error) {
            reject(error);
          }
        });
      };

      // 处理失败状态
      const handleRejected = () => {
        queueMicrotask(() => {
          try {
            const result = onRejected(this.reason);
            resolve(result)
          } catch (error) {
            reject(error);
          }
        });
      };

      // 根据当前状态执行相应逻辑
      if (this.status === 'fulfilled') {
        handleFulfilled();
      } else if (this.status === 'rejected') {
        handleRejected();
      } else if (this.status === 'pending') {
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });

    return newPromise;
  }

  catch(onRejected) {
    // catch 是 then 的语法糖，仅处理失败情况
    return this.then(null, onRejected);
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  background-color: #42b983;
  padding: 20px;
  color: white;
}

main {
  margin: 20px;
}
</style>