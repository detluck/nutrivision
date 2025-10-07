from django.core.management.base import BaseCommand
from backend.models import CorrectedPrediction
import os
import pandas as pd
import shutil
from datetime import datetime

class Command(BaseCommand):
    help = 'Export feedback data and images for model training'
    
    def handle(self, *args, **options):
        # Create export directory with timestamp
        export_dir = f"exports/feedback_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        os.makedirs(export_dir, exist_ok=True)
        
        try:
            # Export corrected predictions from database
            corrected_predictions = CorrectedPrediction.objects.all()
            
            if not corrected_predictions.exists():
                self.stdout.write(
                    self.style.WARNING('No corrected predictions found in database.')
                )
                return
            
            # Create DataFrame from database records
            data = []
            for prediction in corrected_predictions:
                data.append({
                    'correct_label': prediction.correct_prediction,
                    'predicted_label': prediction.model_prediction,
                    'image_path': prediction.image.path if prediction.image else 'no_image',
                    'date': prediction.date.strftime('%Y-%m-%d %H:%M:%S')
                })
            
            df = pd.DataFrame(data)
            
            # Save to CSV
            csv_path = os.path.join(export_dir, 'corrected_predictions.csv')
            df.to_csv(csv_path, index=False)
            images_dir = os.path.join(export_dir, 'images')
            os.makedirs(images_dir, exist_ok=True)
            
            copied_images = 0
            for prediction in corrected_predictions:
                if prediction.image and os.path.exists(prediction.image.path):
                    filename = os.path.basename(prediction.image.path)
                    dest_path = os.path.join(images_dir, filename)
                    shutil.copy2(prediction.image.path, dest_path)
                    copied_images += 1
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully exported {len(data)} predictions and {copied_images} images to {export_dir}'
                )
            )
            
        except Exception as e:
            self.stdout.write(
                self.style.error("Error exporting data")
            )
        
        