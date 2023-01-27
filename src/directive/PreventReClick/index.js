/**
 * v-preventReClick 防按钮多次点击，重复提交数据
 * Copyright (c) 2016~2022 Rockery(1113269755@qq.com)
 */

export default {
  inserted(el, binding, vnode) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true;
        el.classList.add('is-disabled');
        const preventReSetTimeout = setTimeout(() => {
          el.disabled = false;
          el.classList.remove('is-disabled');
          preventReSetTimeout && clearTimeout(preventReSetTimeout);
        }, binding.value || 6000);
      }
    });
  }
};
