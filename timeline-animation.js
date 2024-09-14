document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animationDelay = `${index * 0.5}s`;
            item.style.opacity = '1';
        }, index * 500);
    });
});
